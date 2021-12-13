import { AuthChecker } from 'type-graphql'
import { getConnection, getRepository, Repository } from 'typeorm'
import { Context } from 'vm'
import { User } from '../entities/UserEntity'
/**
 *@description checks if a user is authorized to use the requested query or mutation based on their role
 */
export const customAuthChecker: AuthChecker<Context> = async ({ context }) =>
  // roles, // Optional: you can use roles
  {
    const user = await getConnection().manager.findOne(User, {
      id: context.request.currentUser.uid,
    })

    if (user) {
      return true
    }

    return false
  }
