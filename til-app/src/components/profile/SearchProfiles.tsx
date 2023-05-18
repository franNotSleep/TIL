import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import axiosService, { User } from "../../helpers/axios";

import { FcSearch } from "react-icons/fc";
import { ProfileItem } from "./ProfileList";

interface Response {
  results: User[];
}

interface SearchProfilesProps {
  isOpen: boolean;
  onCloseSearch: () => void;
  onCloseSidebar: () => void;
}
const SearchProfiles = ({
  isOpen,
  onCloseSearch,
  onCloseSidebar,
}: SearchProfilesProps) => {
  const [users, setUsers] = useState<User[]>();

  // Fetch Users by Query
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    axiosService.get<Response>(`/user?search=${e.target.value}`).then((res) => {
      setUsers(res.data.results);
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseSearch}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center m={"auto"}>
              <InputGroup>
                <InputLeftElement fontSize="2em" children={<FcSearch />} />
                <Input
                  variant="unstyled"
                  h={"2.2em"}
                  placeholder="Search Users"
                  onChange={onChange}
                />
              </InputGroup>
            </Center>
          </ModalBody>

          {users?.length && (
            <ModalFooter>
              <VStack
                w={"100%"}
                onClick={() => {
                  onCloseSearch();
                  onCloseSidebar();
                }}
              >
                {users.map((user) => (
                  <>
                    <ProfileItem key={user.id} user={user} />
                    {user.email}
                  </>
                ))}
              </VStack>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchProfiles;
