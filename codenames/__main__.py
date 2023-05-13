import ssl

import uvicorn

from codenames.settings import settings


def main() -> None:
    """Entrypoint of the application."""

    # configure ssl for https
    ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ssl_context.load_cert_chain(certfile="codenames/ssl-certificate/cert.pem",
                                keyfile="codenames/ssl-certificate/key.pem")

    uvicorn.run(
        "codenames.web.application:get_app",
        workers=settings.workers_count,
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
        log_level=settings.log_level.value.lower(),
        factory=True,
        ssl_keyfile="codenames/ssl-certificate/key.pem",
        ssl_certfile="codenames/ssl-certificate/cert.pem"
    )


if __name__ == "__main__":
    main()
