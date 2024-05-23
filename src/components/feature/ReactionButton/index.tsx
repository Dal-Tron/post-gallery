import { Button } from '@/components/base/Button'
import { REACTIONS } from '@/constants/reactions'

import useAddReaction from './hooks/useAddReaction'
import useRemoveReaction from './hooks/useRemoveReaction'

const ReactionButton = ({
  reactionsCount = 0,
  id
}: {
  reactionsCount?: number
  id?: string
}) => {
  const { addReaction } = useAddReaction()
  const { removeReaction } = useRemoveReaction()

  const reactionText = reactionsCount === 1 ? 'Like' : 'Likes'

  const handleReaction = () => {
    if (!id) return

    if (reactionsCount > 0) return removeReaction(id, REACTIONS.HEART)

    addReaction(id, REACTIONS.HEART)
  }

  return (
    <Button
      disabled={!id}
      className="space-x-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={handleReaction}
    >
      <div className="flex flex-row">
        {reactionsCount}
        <div className="mx-1">{reactionText}</div>
      </div>
    </Button>
  )
}

export default ReactionButton
