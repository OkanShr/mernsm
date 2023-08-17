"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { ChangeEvent, useState } from "react";
import { useOrganization } from "@clerk/nextjs";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}


function Comment({ threadId, currentUserImg, currentUserId }: Props) {
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);
  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
      threadImage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    const blob = values.threadImage;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.threadImage = imgRes[0].fileUrl;
      }
    }

    values.threadImage ? values.threadImage:values.threadImage=""

    await addCommentToThread(
      
      {threadId,
      text: values.thread,
      image: values.threadImage !== "" ? values.threadImage : "",
      userId:JSON.parse(currentUserId),
      path: pathname,
      communityId: organization ? organization.id : null,
    }
    );

    form.reset();
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string ) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form className='comment-form flex w-full flex-col rounded-xl px-4 bg-dark-3 ' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='current_user'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none bg-dark-2'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='threadImage'
          render={({ field }) => (
            <FormItem className='flex flex-col items-center gap-4'>
              <FormLabel className=''>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='thread_icon'
                    width={128}
                    height={128}
                    priority
                    className='object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/create.svg'
                    alt='thread_icon'
                    width={64}
                    height={64}
                    className='object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input required={false}
                  type='file'
                  accept='image/*'
                  placeholder='Add thread picture'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn '>
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;