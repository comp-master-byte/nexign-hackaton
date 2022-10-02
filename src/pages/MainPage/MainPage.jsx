import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';
import classNames from 'classnames';
import happy from '../../images/emoji_happy.svg';
import notification from '../../images/notification.svg';
import addUser from '../../images/add_user.svg';
import exit from '../../images/exit.svg';
import Modal from 'react-modal';
import { MyButton } from '../../UI/MyButton/MyButton.jsx';
import { MyInput } from '../../UI/MyInput/MyInput.jsx';
import axios from 'axios';
import cookie from 'js-cookie';
import { deleteFriendRequest, loggedToSystem } from '../../redux/actionCreators.js';
import { getUserDataAction } from '../../redux/asyncActions/getUserDataAction.js';
import { getAllFriendsAction } from '../../redux/asyncActions/getAllFriendsAction.js';

import sad_smile from '../../images/sad_smile.svg';
import sleep_smile from '../../images/sleep_smile.svg';
import happy_smile from '../../images/happy_smile.svg';
import notunderstand_smile from '../../images/notunderstand_smile.svg';
import angry_smile from '../../images/angry_smile.svg';
import { emotions } from '../../mockups/emotions';
import { sendReactionAction } from '../../redux/asyncActions/sendReactionAction';
import { emoji } from '../../mockups/emoji';
import { getAllNotificationsAction, getAllNotifyFriendsAction } from '../../redux/asyncActions/getAllNotificationsAction';
import accept from '../../images/accept.svg';
import reject from '../../images/reject.svg';

const customStyles = {
    overlay: {
        background: 'rgba(0, 0, 0, .4)',
        backdropFilter: 'blur(5px)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '700px',
        height: '600px',
        tranisition: '.25s'
    },
};

const customStyles2 = {
    overlay: {
        background: 'rgba(0, 0, 0, .4)',
        backdropFilter: 'blur(5px)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '700px',
        // height: '600px',
        tranisition: '.25s'
    },
};

const customStylesNotifications = {
    overlay: {
        background: 'rgba(0, 0, 0, .4)',
    },
    content: {
        top: '50%',
        left: '21%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '440px',
        height: '80%',
        tranisition: '.25s',
        padding: '0'
    },
};

const customStylesFriend = {
    overlay: {
        background: 'rgba(0, 0, 0, .4)',
    },
    content: {
        top: '10%',
        right: '35%',
        left: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '985px',
        height: '100px',
        tranisition: '.25s',
        padding: '0'
    },
}

const BASE_URL = 'http://localhost:8080';

export const MainPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const friends = useSelector(state => state.friends.friends);
    const notifications = useSelector(state => state.notifications.notifications);
    const friendsRequests = useSelector(state => state.notifications.notifcationFriends);

    const [friendsWithPosition, setFriendsWithPosition] = useState([]);
    const [modifiedNotifications, setModifiedNotifications] = useState([]);
    const [currentEmoji, setCurrentEmoji] = useState({});
    const [myProfileModal, setMyProfileModal] = useState(false);
    const [notificationModal, setNotificationModal] = useState()
    const [emojiModal, setEmojiModal] = useState(false);
    const [addFriendModal, setAddFriendModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [showAllEmoji, setShowAllEmoji] = useState(false);
    const [selectedImoji, setSelectedImoji] = useState();
    const [friendField, setFriendField] = useState({ friendLogin: '', nick: '' });
    const [nick, setNick] = useState('');
    const [isFriendAccepted, setIsFriendAccepted] = useState(false);
    const [reqId, setReqId] = useState('');

    const openProfileModal = () => setMyProfileModal(true);
    const closeProfileModal = () => setMyProfileModal(false);
    const closeEmojiModal = () => setEmojiModal(false);
    const openAddFriendModal = () => setAddFriendModal(true);
    const closeFriendModal = () => setAddFriendModal(false);

    const closeNotificationModal = () => {
        setNotificationModal(false);
        setModifiedNotifications([]);
    }

    const openEmojiModal = (emojiData) => {
        setEmojiModal(true);
        setCurrentEmoji(emojiData);
    };

    const openNotificationModal = async () => {
        setNotificationModal(true);
        await axios.post(`${BASE_URL}/api/notifications?userId=${user.id}`);
    }

    const toggleEdit = () => setIsEdit(prev => !prev);
    const toggleAllEmoji = () => setShowAllEmoji(prev => !prev);

    const logOut = async () => {
        cookie.remove('JSESSIONID');
        navigate('/');
        dispatch(loggedToSystem(false));
        await axios.get('http://localhost:8080/logout');
    }

    const sendReaction = useCallback((reactionId) => {
        dispatch(sendReactionAction(user.id, reactionId, currentEmoji.id))
    }, [user, currentEmoji])

    const selectNewEmoji = useCallback((emoji, e) => {
        e.stopPropagation();
        setSelectedImoji(emoji.url);
        axios.post(`${BASE_URL}/api/emoji/${user.id}?emojiId=${emoji.id}`)
            .catch(error => console.log(error))
    }, [selectedImoji, user])

    const addToFriendHandler = useCallback(async () => {
        return axios.post(`${BASE_URL}/api/friend?userId=${user.id}&friendLogin=${friendField.friendLogin}&nick=${friendField.nick}`)
    }, [user, friendField])

    const rejectFriend = useCallback(async (requestId) => {
        dispatch(deleteFriendRequest(requestId));
        await axios.post(`${BASE_URL}/api/friend/reject?userId=${user.id}&requestId=${requestId}`)
    }, [user, friendsRequests])

    const acceptFriend = useCallback((requestId) => {
        setReqId(requestId)
        setIsFriendAccepted(true);
    }, [isFriendAccepted, reqId])

    const addToFriendCompletelly = useCallback(async (requestId) => {
        return axios.post(`${BASE_URL}/api/friend/accept?userId=${user.id}&requestId=${requestId}&nick=${nick}`)
    }, [user, nick])

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(getUserDataAction(userId));
            dispatch(getAllFriendsAction(userId));
            dispatch(getAllNotificationsAction(userId));
            dispatch(getAllNotifyFriendsAction(userId));
        }
    }, [])

    useEffect(() => {
        const arr = [
            { x: 150, y: -200 },
            { x: 570, y: -300 },
            { x: 1020, y: -500 },
            { x: 400, y: -400 },
            { x: 200, y: -450 },
            { x: 1500, y: -750 },
            { x: 800, y: -1070 },
            { x: 670, y: -1050 },
        ]
        const arrWithEmoji = [
            { id: 1, url: happy_smile },
            { id: 2, url: notunderstand_smile },
            { id: 3, url: sad_smile },
            { id: 4, url: sleep_smile },
            { id: 5, url: angry_smile },
            { id: 6, url: angry_smile },
            { id: 7, url: sleep_smile },
            { id: 8, url: happy_smile },

        ]
        if (friends) {
            setFriendsWithPosition(friends.map((friend, i) => {
                return {
                    ...friend,
                    positionX: arr[i]?.x,
                    positionY: arr[i]?.y,
                    emojiUrl: arrWithEmoji[i]?.url
                }
            }))
        }
    }, [friends])

    useEffect(() => {
        if (user) {
            switch (user.emotion) {
                case 1:
                    setSelectedImoji(happy_smile);
                    break;
                case 2:
                    setSelectedImoji(notunderstand_smile);
                    break;
                case 3:
                    setSelectedImoji(sad_smile);
                    break;
                case 4:
                    setSelectedImoji(sleep_smile);
                    break;
                case 5:
                    setSelectedImoji(angry_smile);
                    break;
            }
        }
    }, [user])

    useEffect(() => {
        if (notifications) {
            setModifiedNotifications(notifications.map(notification => {
                return {
                    ...notification,
                    imageUrl: emotions[notification.emojiId].url,
                    text: emotions[notification.emojiId].emotion_text
                }
            }))
        }
    }, [notifications])

    return (
        <div className={styles.mainPage}>

            <Modal
                isOpen={myProfileModal}
                onRequestClose={closeProfileModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className={styles.header}>

                    <div onClick={toggleAllEmoji} className={classNames(styles.allEmoji, {
                        [styles.allEmojyOpen]: showAllEmoji
                    })}>
                        <div className={styles.header__emoji}>
                            <img src={selectedImoji} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            {emoji.map(em =>
                                <div onClick={(e) => selectNewEmoji(em, e)} key={em.id} style={{ marginLeft: 20 }}>
                                    <img src={em.url} style={{ width: 70, height: 70 }} />
                                </div>
                            )}
                        </div>

                    </div>

                    <div className={styles.headerLeftPanel}>
                        <MyButton onClick={toggleEdit} className={styles.headerLeftPanel__btn} buttonText='Редактировать' />
                        <MyButton onClick={closeProfileModal} buttonText='Закрыть' />
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.description__title}>Описание</div>
                    <MyInput
                        value={user.fio}
                        disabled={!isEdit}
                        className={styles.description__input}
                    />
                    <MyInput
                        value={user.login}
                        disabled={!isEdit}
                        className={styles.description__input} />
                    <MyInput
                        value={user.phone}
                        disabled={!isEdit}
                        className={styles.description__input} />
                    <MyInput
                        value={user.tgName}
                        disabled={!isEdit}
                        className={styles.description__input} />
                </div>
            </Modal>

            <Modal
                isOpen={emojiModal}
                onRequestClose={closeEmojiModal}
                style={customStyles2}
                ariaHideApp={false}
            >
                <header className={styles.emojiHeader}>
                    <div className={styles.emojiHeaderLeft}>
                        <img src={currentEmoji.emojiUrl} />
                        <div className={styles.emojiHeader__name}>{currentEmoji.login}</div>
                    </div>
                    <MyButton onClick={closeEmojiModal} className={styles.emojiHeader__btn} buttonText='Закрыть' />
                </header>
                <div className={styles.reactions}>
                    <div className={styles.reactions__title}>Отправить реакцию</div>
                    <div style={{ display: 'flex' }}>
                        {emotions.map(emotion =>
                            <div onClick={() => sendReaction(emotion.id)} key={emotion.id} style={{ marginRight: 42, cursor: 'pointer' }}>
                                <img style={{ width: 100, height: 100 }} src={emotion.url} />
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.call}>
                    <a href={`https://t.me/${currentEmoji.tgName}`}>Позвонить</a>
                </div>
            </Modal>

            <Modal
                isOpen={notificationModal}
                onRequestClose={closeNotificationModal}
                style={customStylesNotifications}
                ariaHideApp={false}
            >
                <div className={styles.notifications}>
                    {modifiedNotifications.length !== 0 && <div className={styles.notifications__title}>Полученные реакции</div>}
                    {modifiedNotifications?.map(notify =>
                        <div key={notify.emojiId} className={styles.notification}>
                            <div className={styles.notificationData}>
                                <div className={styles.notificationData__image}>
                                    <img src={notify.imageUrl} />
                                </div>
                                <div className={styles.notification__fromUser}>{notify.fromUser}:</div>
                                <div className={styles.notificationData__text}>{notify.text}</div>
                            </div>
                        </div>
                    )}
                    {modifiedNotifications.length === 0 && friendsRequests.length === 0 && <h1 style={{ padding: 20 }}>Уведомлений нет</h1>}
                </div>

                <div className={styles.notifications}>
                    {friendsRequests.length !== 0 && <div className={styles.notifications__title}>Принятие друзей в заявку</div>}
                    {friendsRequests?.map(friend =>
                        <div className={styles.friend}>
                            <div className={styles.friend__name}>{friend.fromUser} хочет добавить тебя в друзья</div>
                            {
                                !isFriendAccepted &&
                                <div className={styles.friendBtns}>
                                    <img src={accept} onClick={() => acceptFriend(friend.requestId)} />
                                    <img src={reject} onClick={() => rejectFriend(friend.requestId)} />
                                </div>
                            }
                            {(isFriendAccepted && (reqId === friend.requestId))
                                &&
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <MyInput className={styles.spInput} onChange={event => setNick(event.target.value)} />
                                    <div className={styles.friendBtns}>
                                        <img src={accept} onClick={() => addToFriendCompletelly(friend.requestId)} />
                                    </div>
                                </div>
                            }
                            {isFriendAccepted && (reqId !== friend.requestId) &&
                                <div className={styles.friendBtns}>
                                    <img src={accept} onClick={() => acceptFriend(friend.requestId)} />
                                    <img src={reject} onClick={() => rejectFriend(friend.requestId)} />
                                </div>
                            }
                        </div>
                    )}
                </div>

            </Modal>

            <Modal
                isOpen={addFriendModal}
                onRequestClose={closeFriendModal}
                style={customStylesFriend}
                ariaHideApp={false}
            >
                <div className={styles.friendModalInner}>
                    <MyInput
                        placeholder='Логин пользователя'
                        className={styles.friendModalInner__input}
                        value={friendField.friendLogin}
                        onChange={event => setFriendField({ ...friendField, friendLogin: event.target.value })}
                    />
                    <MyInput
                        placeholder='Имя'
                        className={styles.friendModalInner__input}
                        value={friendField.nick}
                        onChange={event => setFriendField({ ...friendField, nick: event.target.value })}
                    />
                    <div className={styles.friendBtns}>
                        <img onClick={addToFriendHandler} src={accept} className={styles.friendModalInner__img} />
                        <img onClick={closeFriendModal} src={reject} />
                    </div>
                </div>
            </Modal>

            <div className={styles.mainPageInner}>
                <header className={styles.header}>

                    <div onClick={openNotificationModal} className={styles.headerBlock}>
                        {modifiedNotifications.length + friendsRequests.length > 0 && <div className={styles.notificationsLength}>{modifiedNotifications.length + friendsRequests.length}</div>}
                        <img src={notification} />
                    </div>

                    <div className={styles.headerLeft}>
                        <div onClick={openAddFriendModal} className={classNames(styles.headerBlock, styles.exitBlock)}>
                            <img src={addUser} />
                        </div>
                        <div onClick={logOut} className={styles.headerBlock}>
                            <img src={exit} />
                        </div>
                    </div>
                </header>

                <div className={styles.users}>
                    {friendsWithPosition.map(friend =>
                        <div
                            onClick={() => openEmojiModal(friend)}
                            className={styles.users__emoji}
                            key={friend.id}
                            style={{
                                maxWidth: 200,
                                transform: `translate(${friend.positionX}px, ${friend.positionY}px)`
                            }}
                        >
                            <img className={styles.emoji} src={friend.emojiUrl} />
                            <div className={styles.user__name}>{friend.login}</div>
                        </div>
                    )}
                </div>

                <footer onClick={openProfileModal} className={styles.footer}>
                    <div className={styles.footerMyProfile}>
                        <div className={styles.footerEmoji}>
                            <img src={selectedImoji} />
                        </div>
                        Мой профиль
                    </div>
                </footer>
            </div>
        </div>
    )
}