import Head from 'next/head'
import { Button, Flex, Stack } from '@chakra-ui/react'

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '@/components/Form/Input'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6),
})

export default function SignIn() {
  const { signIn } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  })

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    signIn(values)
  }

  return (
    <>
      <Head>
        <title>Dashgo</title>
      </Head>
      <main>
        <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
          <Flex
            as="form"
            w="100%"
            maxW={360}
            bg="gray.800"
            p="8"
            borderRadius={8}
            flexDir="column"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Stack spacing="4">
              <Input
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />

              <Input
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
            </Stack>
            <Button
              type="submit"
              mt="6"
              colorScheme="pink"
              size="lg"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </Flex>
        </Flex>
      </main>
    </>
  )
}
