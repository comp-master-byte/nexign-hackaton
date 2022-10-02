import axios from 'axios';

export const sendReactionAction = (userId, reactionId, friendId) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/rection?userId=${userId}&friendId=${friendId}&emojiId=${reactionId}`)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
}