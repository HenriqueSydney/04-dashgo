import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Henrique Sydney</Text>
          <Text color="gray.300" fontSize="small">
            henriquesydney@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Henrique Sydney"
        src="http://github.com/henriqueSydney.png"
      />
    </Flex>
  )
}
