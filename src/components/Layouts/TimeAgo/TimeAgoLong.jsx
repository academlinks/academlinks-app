import moment from 'moment';
// import styles from './timeAgo.module.scss';

function TimeAgoLong({ className, date = new Date('2022-07-20'), format = 'ddd/MMM/yyyy' }) {
  return <span className={`${className}`}>{moment(date).format(format)}</span>;
}

export default TimeAgoLong;
