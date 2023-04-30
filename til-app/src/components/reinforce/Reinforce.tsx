import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaHammer } from "react-icons/fa";
import { IPost } from "../post/Post";
import { KeyedMutator } from "swr";
import { Form } from "react-router-dom";
import useSWR from "swr";
import { User, fetcher } from "../../helpers/axios";
import Reinforces from "./Reinforces";
import CreateReinforce from "./CreateReinforce";

export interface IReinforce {
  id: string;
  author: User;
  post: IPost;
  body: string;
  source?: string;
  photo?: string;
  created: Date;
  updated: Date;
}

interface IReinforceResponse {
  results: IReinforce[];
  count: number;
  previous: string;
  next: string;
}

interface ReinforceProps {
  currentPost: IPost;
  refresh: KeyedMutator<any>;
}

const Reinforce = ({ currentPost, refresh }: ReinforceProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const reinforces = useSWR<IReinforceResponse>(
    `/post/${currentPost.id}/reinforce`,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );
  return (
    <>
      <Button
        flex={1}
        leftIcon={<FaHammer />}
        fontSize={"sm"}
        rounded={"full"}
        _focus={{
          bg: "gray.200",
        }}
        onClick={onOpen}
      >
        Reinforce {reinforces.data?.count}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bgColor={"gray.100"}>
            <Reinforces
              refresh={reinforces.mutate}
              reinforces={reinforces.data?.results}
              currentPost={currentPost}
            />
          </ModalBody>
          <ModalFooter m="auto">
            <CreateReinforce
              currentPost={currentPost}
              refresh={reinforces.mutate}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Reinforce;
