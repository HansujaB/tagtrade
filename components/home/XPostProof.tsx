import { ArrowLeft, Bookmark, Heart, MessageCircle, MoreHorizontal, Repeat2, Share, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function PostActions({ reply = false }: { reply?: boolean }) {
  return <div aria-hidden="true" className="flex items-center justify-between text-[#71767b]">
    <span className="inline-flex items-center gap-1"><MessageCircle className="size-[18px]" />{reply ? "" : <span className="text-xs">1</span>}</span>
    <Repeat2 className="size-[18px]" /><Heart className="size-[18px]" /><Bookmark className="size-[18px]" /><Share className="size-[18px]" />
  </div>;
}

export function XPostProof() {
  return <figure className="mx-auto w-full max-w-[610px]">
    <div className="overflow-hidden rounded-[18px] bg-[#050505] text-[#f7f9f9] shadow-[0_32px_90px_rgba(0,0,0,.5)] ring-1 ring-white/10">
      <div className="flex h-[62px] items-center gap-8 px-5 text-[17px] font-bold"><ArrowLeft className="size-5" aria-hidden="true" /><span>Post</span><span className="ml-auto font-mono text-xs font-normal text-[#71767b]">X</span></div>
      <div data-x-original className="px-5 pt-3">
        <div className="flex items-start gap-3">
          <Avatar size="lg" className="size-10"><AvatarFallback className="bg-[#a9bdc9] text-[#4b5f6c]"><UserRound className="size-6" /></AvatarFallback></Avatar>
          <div className="flex min-w-0 flex-1 items-center justify-between"><div className="flex flex-col leading-5"><strong className="text-[15px]">Trader</strong><span className="text-sm text-[#71767b]">@trader</span></div><MoreHorizontal className="size-5 text-[#71767b]" aria-hidden="true" /></div>
        </div>
        <p className="mt-5 break-words text-[17px] leading-[1.55]"><span className="text-[#1d9bf0]">@tagtradex</span> buy 1 XRP of <span className="text-[#1d9bf0]">$DAWN</span></p>
        <div className="mt-5 border-t border-[#2f3336] py-4"><PostActions /></div>
      </div>
      <div data-x-composer className="flex items-center gap-3 border-y border-[#2f3336] px-5 py-4">
        <Avatar size="lg" className="size-10"><AvatarFallback className="bg-[#a9bdc9] text-[#4b5f6c]"><UserRound className="size-6" /></AvatarFallback></Avatar>
        <span className="flex-1 text-[16px] text-[#71767b]">Post your reply</span>
        <Button disabled className="rounded-full bg-[#2f3336] px-5 text-[#71767b]">Reply</Button>
      </div>
      <div data-x-reply className="flex gap-3 px-5 pb-4 pt-5">
        <Avatar size="lg" className="size-10"><AvatarFallback className="bg-[#f7f9f9] text-black">T</AvatarFallback></Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-1 text-sm leading-5"><strong className="text-[15px]">TagTradeX</strong><span className="text-[#71767b]">@tagtradex</span><MoreHorizontal className="ml-auto size-5 text-[#71767b]" aria-hidden="true" /></div>
          <p className="mt-1 break-words text-[15px] leading-[1.45]">Bought <span className="text-[#1d9bf0]">$DAWN</span> with 1 XRP from your pocket.</p>
          <div className="mt-5"><PostActions reply /></div>
        </div>
      </div>
    </div>
  </figure>;
}
