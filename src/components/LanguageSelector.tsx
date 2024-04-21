import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constant";

interface LanguageSelectorProps {
  language: string;
  onSelectLanguage: (language: string) => void;
}

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";
const LanguageSelector = ({
  language,
  onSelectLanguage,
}: LanguageSelectorProps) => {
  return (
    <Box mb={4} ml={2}>
      <Text mb={2} fontSize="lg" fontWeight="bold">
        Language
      </Text>
      <Menu isLazy>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {language}
        </MenuButton>
        <MenuList bg="#110c1b">
          {languages.map(([lang, version]: [string, string]) => (
            <MenuItem
              key={lang}
              onClick={() => onSelectLanguage(lang)}
              color={lang === language ? ACTIVE_COLOR : "gray.400"}
              bg={lang === language ? "gray.700" : "transparent"}
              _hover={{ bg: "gray.900", color: ACTIVE_COLOR }}
            >
              {lang === language && <ChevronDownIcon />}
              {lang}
              &nbsp;
              <Text as="span" color="gray.600">
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
