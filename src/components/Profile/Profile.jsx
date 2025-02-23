import css from "./Profile.module.css";
export default function Profile({ name, tag, location, image, stats }) {
  return (
    <div className={css.profile}>
      <div className={css.profileInfo}>
        <img src={image} alt="User avatar" className={css.avatar} />
        <p className={css.userName}>{name}</p>
        <p className={css.userTag}>@{tag}</p>
        <p className={css.userLocation}>{location}</p>
      </div>

      <ul className={css.profileStatus}>
        <li className={css.profileStatusItem}>
          <span className={css.statusTitle}>Followers</span>
          <span className={css.statusValue}>{stats.followers}</span>
        </li>
        <li className={css.profileStatusItem}>
          <span className={css.statusTitle}>Views</span>
          <span className={css.statusValue}>{stats.views}</span>
        </li>
        <li className={css.profileStatusItem}>
          <span className={css.statusTitle}>Likes</span>
          <span className={css.statusValue}>{stats.likes}</span>
        </li>
      </ul>
    </div>
  );
}
