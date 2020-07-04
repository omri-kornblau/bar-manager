import CommuteIcon from '@material-ui/icons/Commute';
import HealingIcon from '@material-ui/icons/Healing';
import BusinessIcon from '@material-ui/icons/Business';

export const typeButtons = [
  {
    id: "typeA",
    label: "סוג א'",
    icon: BusinessIcon
  },
  {
    id: "typeB",
    label: "סוג ב'",
    icon: CommuteIcon
  },
  {
    id: "typeC",
    label: "סוג ג'",
    icon: HealingIcon
  }
]

export const filterButtons = [
  {
    id: "smallCompanies",
    label: "חברות קטנות",
    isActive: true
  },
  {
    id: "mediumCompanies",
    label: "חברות בינוניות",
    isActive: true
  },
  {
    id: "largeCompanies",
    label: "חברות גדולות",
    isActive: true
  },
  {
    id: "currentlyInsured",
    label: "נכסים מבוטחים",
    isActive: true
  }
]
