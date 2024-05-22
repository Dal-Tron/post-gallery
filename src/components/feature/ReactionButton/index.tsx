import { Button } from '@/components/base/Button'
import useReaction from '@/graphql/hooks/useReaction'

const ReactionButton = ({
  reactionsCount,
  id
}: {
  reactionsCount?: number
  id?: string
}) => {
  const { addReaction } = useReaction()

  const reactionText = reactionsCount === 1 ? 'Like' : 'Likes'

  const handleAddReaction = () => {
    id && addReaction(id, 'heart')
  }

  return (
    <Button
      disabled={!id}
      className="space-x-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={handleAddReaction}
    >
      <div className="flex flex-row">
        {reactionsCount || 0}
        <div className="mx-1">{reactionText}</div>
      </div>
    </Button>
  )
}

export default ReactionButton
