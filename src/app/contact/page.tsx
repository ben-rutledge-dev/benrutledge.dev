import { Button } from '@/app/components/Button';
import { PageWrapper } from '@/app/components/PageWrapper';

export default function Contact() {
  return (
    <PageWrapper title="Contact">
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>I'm always open to new opportunities and collaborations. Whether you have a project in mind, want to chat about tech, or just want to say hi, feel free to reach out!</p>
        <Button href="mailto:ben.d.rutledge@gmail.com">Email me</Button>
      </div>
    </PageWrapper>
  );
}