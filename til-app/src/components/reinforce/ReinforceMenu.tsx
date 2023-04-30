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
import Post, { IPost } from "../post/Post";
import { IReinforce } from "./Reinforce";
import EditReinforce from "./EditReinforce";

interface ReinforceMenuProps {
  reinforce: IReinforce;
  currentPost: IPost;
  refresh: KeyedMutator<any>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReinforceMenu = ({
  reinforce,
  refresh,
  currentPost,
  setEdit,
}: ReinforceMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onDelete = () => {
    axiosService
      .delete(`/post/${currentPost.id}/reinforce/${reinforce.id}/`)
      .then((res) => {
        toast({
          title: "Reinforce deleted",
          description: "Reinforce deleted successfully",
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
          description: err.message || "Error deleting reinforce",
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
      {/* Edit Form */}
      <EditReinforce
        isOpen={isOpen}
        onClose={onClose}
        reinforce={reinforce}
        refresh={refresh}
        currentPost={currentPost}
      />
    </Menu>
  );
};
export default ReinforceMenu;
