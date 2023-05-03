from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from codenames.settings import Settings
from ..utils import auth
from codenames.db.models.user import User
from ..utils.auth import (verify_password, create_access_token, oauth2_scheme,
                          decode_access_token)
from ..utils.base_types import UserCredentials

router = APIRouter()


@router.post("/users/create")
async def create_user(user_creds: UserCredentials):
    hashed_password = auth.get_password_hash(user_creds.password)
    user = await User.objects.create(username=user_creds.email,
                                     password=hashed_password)
    return {"id": user.id, "username": user_creds.email}


@router.post("/token")
async def access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await User.objects.get(username=form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={'WWW-Authenticate': 'Bearer'}
        )
    access_token_expires = timedelta(minutes=Settings().ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(data={"sub": user.username},
                                expires_delta=access_token_expires)
    return {"access_token": token, "token_type": "Bearer"}


@router.get("/me")
async def current_user(token: str = Depends(oauth2_scheme)):
    username = decode_access_token(token)
    user = await User.objects.get(username=username)
    return {'id': user.id, 'username': user.username, 'created_at': user.created_at}

