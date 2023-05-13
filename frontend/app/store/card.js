import {SERVER_URL} from "../constants";
import {devtools, persist} from "zustand/middleware";
import {create} from "zustand";
import _ from "underscore";

export async function reveal_card(user, index, roomId, gameId) {
    const card = await fetch(`${SERVER_URL}game/reveal_card?room_id=${roomId}&index=${index}&game_id=${gameId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`
        }
    });
    return card.json();
}

export async function get_all_cards(user, roomId) {
    const all_cards = await fetch(`${SERVER_URL}game/get_all_cards?room_id=${roomId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user['access_token']}`,
        }
    });
    return all_cards.json();
}

const cardsStore = (set) => ({
    cardData: [],
    setCardData: (data) => set({cardData: _.sortBy(data, 'sequence')}),
    addColorToCard: (id, color) =>
        set((state) => {
          const updatedCardData = state.cardData.map((card) => {
            if (card.id === id) {
              return {
                ...card,
                color,
              };
            }
            return card;
          });
          return { cardData: _.sortBy(updatedCardData, 'sequence') };
    }),
})

const useCardsStore = create(
    devtools(
        persist(cardsStore, {
            name: 'Cards'
        })
    )
)

export default useCardsStore;
