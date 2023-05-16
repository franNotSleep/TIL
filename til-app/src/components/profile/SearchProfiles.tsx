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
  onClose: () => void;
}
const SearchProfiles = ({ isOpen, onClose }: SearchProfilesProps) => {
  const [users, setUsers] = useState<User[]>();

  // Fetch Users by Query
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    axiosService.get<Response>(`/user?search=${e.target.value}`).then((res) => {
      setUsers(res.data.results);
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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
              <VStack w={"100%"} onClick={onClose}>
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
