import { InterviewIcon } from '@/components/icons/InterviewIcon';
import { OfferIcon } from '@/components/icons/OfferIcon';
import { RejectedIcon } from '@/components/icons/RejectedIcon';
import { WishlistIcon } from '@/components/icons/WishlistIcon';
import { AppliedIcon } from '@/components/icons/AppliedIcon';

const COLUMN_ICONS = {
  wishlist: <WishlistIcon />,
  applied: <AppliedIcon />,
  interview: <InterviewIcon />,
  offer: <OfferIcon />,
  rejected: <RejectedIcon />
};

export default COLUMN_ICONS;
