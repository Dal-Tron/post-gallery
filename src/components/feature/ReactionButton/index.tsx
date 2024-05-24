import { Button } from '@/components/base/Button'
import { REACTIONS } from '@/constants/reactions'
import useAddReaction from './hooks/useAddReaction'

const ReactionButton = ({
  reactionsCount = 0,
  id
}: {
  reactionsCount?: number
  id?: string
}) => {
  const { addReaction } = useAddReaction()

  const reactionText = reactionsCount === 1 ? 'Like' : 'Likes'

  const handleReaction = () => {
    if (!id) return

    addReaction(id, REACTIONS.HEART)
  }

  return (
    <Button
      disabled={!id}
      className="space-x-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={handleReaction}
    >
      <div className="flex flex-row" data-testid="reaction-button">
        {reactionsCount}
        <div className="mx-1">{reactionText}</div>
      </div>
    </Button>
  )
}

export default ReactionButton
