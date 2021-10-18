import { formatDistanceToNowStrict } from 'date-fns';

export default function distanceToNow(dateTime) {
  return formatDistanceToNowStrict(dateTime);
}
