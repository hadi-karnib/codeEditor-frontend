import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { LANGUAGE_VERSIONS } from "../../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      mb={4}
      w="100%"
    >
      <Text mb={2} fontSize="lg" color={"#0582ca"} alignSelf="flex-start">
        Language:
      </Text>
      <Menu isLazy>
        <MenuButton
          as={Button}
          bgColor={"#0582ca"}
          w="20%"
          rightIcon={<ChevronDownIcon />}
        >
          {language}
        </MenuButton>
        <MenuList bgColor={"gray.400"}>
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? "#0582ca" : ""}
              bg={lang === language ? "gray.700" : "gray.400"}
              _hover={{
                bg: lang === language ? "gray.700" : "gray.500",
                color: lang === language ? "#0582ca" : "#fff",
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
