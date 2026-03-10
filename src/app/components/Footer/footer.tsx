import { SocialIcon } from '@/app/components/Socialicon';

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full text-center text-sm text-gray-500 py-6 z-10 flex flex-col gap-2">
      <span>&copy; {new Date().getFullYear()} Ben Rutledge. All rights reserved. </span>
      <div className="flex items-center justify-center z-20">
        <SocialIcon href="https://github.com/ben-rutledge-dev" icon="/icons/github-logo.svg" alt="GitHub" />
        <SocialIcon href="https://www.linkedin.com/in/benjamin-rutledge-03a331174/" icon="/icons/linked-in-logo.svg" alt="LinkedIn" />
      </div>
    </footer>
  );
}