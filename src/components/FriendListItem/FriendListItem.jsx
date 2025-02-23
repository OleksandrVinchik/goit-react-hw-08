import css from "../FriendListItem/FriendListItem.module.css";
export default function FriendListItem({ avatar, name, isOnline }) {
  return (
    <div className={css.FriendListItem}>
      <img className={css.avatar} src={avatar} alt="Avatar" width="48" />
      <p className={css.name}>{name}</p>
      {isOnline ? (
        <p className={css.online}>Online</p>
      ) : (
        <p className={css.offline}>Offline</p>
      )}
    </div>
  );
}
