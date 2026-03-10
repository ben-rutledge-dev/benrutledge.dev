import Link from 'next/link';
import { Button } from '../components/Button';

export default function Contact() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Dim and blur overlay over the background noise lines */}
      <div className="fixed inset-0 z-5 bg-black/30 backdrop-blur-[2px]" />
      
      {/* Content overlay */}
      <div className="relative z-10 p-8 animate-slide-in-up">
        <div className="max-w-3xl mx-auto pt-20">
          <h1 className="text-4xl font-bold mb-6">Contact</h1>
          
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>I'm always open to new opportunities and collaborations. Whether you have a project in mind, want to chat about tech, or just want to say hi, feel free to reach out!</p>
            <Button href="mailto:ben.d.rutledge@gmail.com">Email me</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
