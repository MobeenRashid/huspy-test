import { Link as ReactLink } from 'react-router-dom';
import {
    Box,
    Flex,
    Link,
    Text,
} from '@chakra-ui/react';

export default function NavBar() {
    return (<>
        <Box bg={'gray.100'} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Flex dir={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Text fontSize={'2xl'} fontFamily={'monospace'} fontWeight={'bold'}>
                        <Link as={ReactLink} to={'/'}>Moovi</Link>
                    </Text>
                </Flex>
            </Flex>
        </Box>
    </>);
}