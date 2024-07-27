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
    >
      <Text mb={2} fontSize="large" color={"#0582ca"} alignSelf="flex-start">
        Language:
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          bgColor={"#0582ca"}
          w="20%"
          rightIcon={<ChevronDownIcon />}
        >
          {language}
        </MenuButton>
        <MenuList>
          {languages.map(([language, version]) => (
            <MenuItem key={language} onClick={() => onSelect(language)}>
              {language}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                {version}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
