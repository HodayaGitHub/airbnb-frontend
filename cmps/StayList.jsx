import { StayPreview } from "./StayPreview.jsx"
import { removeStay } from '../store/actions/stay.actions.js'
export function StayList({ stays, onRemoveStay }) {

    return (
        <ul className="stay-list">
            {stays.map(stay =>
                <StayPreview
                    key={stay._id}
                    stay={stay}
                    onRemoveStay={onRemoveStay}
                />

            )}
        </ul>
    )
}