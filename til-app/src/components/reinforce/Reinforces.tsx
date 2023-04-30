import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Link,
  Spacer,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { KeyedMutator, MutatorOptions } from "swr";
import { IReinforce } from "./Reinforce";
import { format } from "timeago.js";
import { NavLink } from "react-router-dom";
import ReinforceMenu from "./ReinforceMenu";
import { getUserData } from "../../hooks/user.actions";
import { IPost } from "../post/Post";
import { useState } from "react";
import EditReinforce from "./EditReinforce";

interface ReinforcesProps {
  refresh: KeyedMutator<any>;
  reinforces?: IReinforce[];
  currentPost: IPost;
}

const Reinforces = ({ refresh, reinforces, currentPost }: ReinforcesProps) => {
  return (
    <>
      {reinforces?.length ? (
        reinforces.map((reinforce) => (
          <ReinforceItem
            key={reinforce.id}
            refresh={refresh}
            reinforce={reinforce}
            currentPost={currentPost}
          />
        ))
      ) : (
        <Text>No reinforces.</Text>
      )}
    </>
  );
};

interface ReinforceItemProps {
  refresh: KeyedMutator<any>;
  reinforce: IReinforce;
  currentPost: IPost;
}

const ReinforceItem = ({
  refresh,
  reinforce,
  currentPost,
}: ReinforceItemProps) => {
  const [edit, setEdit] = useState(false);
  const { user } = getUserData();

  return (
    <Center>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        mb={3}
      >
        <HStack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Reinforce
          </Text>
          <Spacer />
          {user.id == reinforce.author.id && (
            <ReinforceMenu
              reinforce={reinforce}
              currentPost={currentPost}
              refresh={refresh}
              setEdit={setEdit}
            />
          )}
        </HStack>

        <Text color={"gray.600"} mb={3}>
          {reinforce.body}
        </Text>

        {reinforce.photo && <Image src={reinforce.photo} />}
        {reinforce.source && (
          <NavLink to={reinforce.source} target="_blank">
            <Text>Source: </Text>
            <Link color={"blue.400"}>{reinforce.source}</Link>
          </NavLink>
        )}
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <NavLink to={"/profile/" + reinforce.author.id}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            />
          </NavLink>

          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{reinforce.author.username}</Text>
            <Text color={"gray.500"}>{format(reinforce.updated)}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default Reinforces;
