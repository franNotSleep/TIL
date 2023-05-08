import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";
import Comments from "./Comments";
import { IPost } from "../post/Post";
import useSWR, { KeyedMutator } from "swr";
import CreateComment from "./CreateComment";
import { User, fetcher } from "../../helpers/axios";

export interface IComment {
  id: string;
  body: string;
  author: User;
  post: string;
  created: Date;
  updated: Date;
}

interface IResponseComment {
  count: number;
  next: string | null;
  previous: string | null;
  results: IComment[];
}

interface CommentProps {
  currentPost: IPost;
  refresh: KeyedMutator<any>;
}

const Comment = ({ currentPost, refresh }: CommentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const comments = useSWR<IResponseComment>(
    `/post/${currentPost.id}/comment`,
    fetcher,
    {
      refreshInterval: 20000,
    }
  );
  return (
    <>
      <Button
        leftIcon={<FaComment />}
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        bg={"blue.400"}
        color={"white"}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        _hover={{
          bg: "blue.500",
        }}
        _focus={{
          bg: "blue.500",
        }}
        onClick={onOpen}
      >
        Comment {comments.data?.count}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bgColor={"gray.100"}>
            {comments.isLoading ? (
              <Center>
                <Spinner size="xl" />
              </Center>
            ) : (
              <Comments
                comments={comments.data?.results}
                currentPost={currentPost}
                refresh={comments.mutate}
              />
            )}
            <CreateComment
              currentPost={currentPost}
              refresh={comments.mutate}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Comment;
