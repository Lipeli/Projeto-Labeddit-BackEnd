import { ZodError } from "zod";
import { PostBusiness } from "../business/PostBusiness";
import { Response, Request } from "express";
import { BaseError } from "../errors/BaseError";
import { CreatePostSchema } from "../dtos/post/createPost.dto";
import { GetPostSchema } from "../dtos/post/getPost.dto";
import { UpvoteOrDownvotePostSchema } from "../dtos/post/upvoteOrDownvotePost.dto";

export class PostController {
  constructor(
    private postBusiness: PostBusiness
  ) { }

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        conteudo: req.body.conteudo,
        token: req.headers.authorization
      })

      const output = await this.postBusiness.createPost(input)

      res.status(201).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro Inesperdo")
      }
    }
  }

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = GetPostSchema.parse({
        token: req.headers.authorization
      })

      const output = await this.postBusiness.getPosts(input)

      res.status(201).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro Inesperdo")
      }
    }
  }
  public upvoteDownvotePost = async (req: Request, res: Response) => {
    try {

      const input = UpvoteOrDownvotePostSchema.parse({
        postId: req.params.id,
        token: req.headers.authorization,
        upvote: req.body.upvote,
      })

      const output = await this.postBusiness.upvoteOrDownvotePost(input)

      res.status(200).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro Inesperdo")
      }
    }
  }
}