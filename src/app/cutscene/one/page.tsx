import Message from '@/app/_components/bot/message';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion'
import Image from 'next/image';
import { messages } from './messages';
import CutsceneOne from '../cutscene';

export default function CutscenePage() {
  return (
    <div>
      <CutsceneOne/>
    </div>
  )
}
