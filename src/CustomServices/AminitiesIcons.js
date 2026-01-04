import {
  CloudFog,
  Driving,
  Drop,
  EmojiHappy,
  Flash,
  House2,
  Security,
  Star1,
  Trash,
  Tree,
} from "iconsax-react";

export function AminitiesIcons(aminity) {
  switch (aminity) {
    case "Garden":
      return <Tree size="32" variant="Bulk" />;
    case "Water Supply":
      return <Drop size="32" variant="Bulk" />;
    case "Electricity":
      return <Flash size="32" variant="Bulk" />;
    case "Security Guard":
      return <Security size="32" variant="Bulk" />;
    case "Swimming Pool":
      return <CloudFog size="32" variant="Bulk" />;
    case "Sewage":
      return <Trash size="32" variant="Bulk" />;
    case "Kids Play Area":
      return <EmojiHappy size="32" variant="Bulk" />;
    case "Internal Road":
      return <Driving size="32" variant="Bulk" />;
    case "Club House":
      return <House2 size="32" variant="Bulk" />;
    default:
      return <Star1 size="32" variant="Bulk" />;
  }
}
