import { EditIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  useToast,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { KeyedMutator } from "swr";
import axiosService from "../../helpers/axios";
import { IComment } from "./Comment";
import Post, { IPost } from "../post/Post";

interface CommentMenuProps {
  comment: IComment;
  currentPost: IPost;
  refresh: KeyedMutator<any>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentMenu = ({
  comment,
  refresh,
  currentPost,
  setEdit,
}: CommentMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onDelete = () => {
    axiosService
      .delete(`/post/${currentPost.id}/comment/${comment.id}/`)
      .then((res) => {
        toast({
          title: "Comment deleted",
          description: "Comment deleted successfully",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
          icon: <AiOutlineDelete />,
        });
        refresh();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message || "Error deleting comment",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BsThreeDotsVertical />}
        aria-label="Options"
        variant="outline"
      />

      <MenuList>
        <MenuItem
          onClick={() => {
            setEdit(true);
          }}
          icon={<EditIcon color="blue" />}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={onDelete} icon={<AiOutlineDelete color="red" />}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default CommentMenu;
