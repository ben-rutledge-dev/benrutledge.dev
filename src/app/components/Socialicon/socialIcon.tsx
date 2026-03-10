import Image from "next/image";
import Link from "next/link";

type SocialIconProps = {
  href: string;
  icon: string;
  alt: string;
}

export const SocialIcon: React.FC<SocialIconProps> = (props) => {
  const { href, icon, alt } = props;
  
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Image
        src={icon}
        alt={alt}
        width={20}
        height={20}
        className="inline-block mx-2 hover:opacity-70 transition"
      />
    </Link>
  );
}