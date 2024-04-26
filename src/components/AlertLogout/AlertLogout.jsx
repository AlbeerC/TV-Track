import { IoExit } from "react-icons/io5"
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, Button} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useRef } from 'react'
import { useAuth } from "../../context/AuthContext"

function AlertLogout () {

    const auth = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const closeAlert = () => {
        onClose()
        auth.logout()
    }

    return (
        <>
            <Button className="logout-button" colorScheme='red' onClick={onOpen}> <span className="logout-text">Cerrar sesión</span> <IoExit /></Button>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader backgroundColor={'#fff'} color={'red'} fontSize='16px' fontWeight='bold'>
                            Cerrar sesión
                        </AlertDialogHeader>

                        <AlertDialogBody fontWeight={'bold'}>
                            Estas seguro que quieres cerrar sesión?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} fontSize={'15px'}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={closeAlert} ml={3} fontSize={'15px'}>
                                Cerrar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
    </>
    )
}

export default AlertLogout