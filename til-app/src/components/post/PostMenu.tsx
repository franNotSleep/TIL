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
import EditPost from "./EditPost";
import { IPost } from "./Post";

interface PostMenuProps {
  post: IPost;
  refresh: KeyedMutator<any>;
}

const PostMenu = ({ post, refresh }: PostMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onDelete = () => {
    axiosService
      .delete("/post/" + post.id)
      .then((res) => {
        toast({
          title: "Post deleted",
          description: "Post deleted successfully",
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
          description: err.message || "Error deleting post",
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
        <MenuItem onClick={onOpen} icon={<EditIcon color="blue" />}>
          Edit
        </MenuItem>
        <MenuItem onClick={onDelete} icon={<AiOutlineDelete color="red" />}>
          Delete
        </MenuItem>
      </MenuList>

      <EditPost
        isOpen={isOpen}
        onClose={onClose}
        post={post}
        refresh={refresh}
      />
    </Menu>
  );
};
export default PostMenu;
