import { StayPreview } from "./StayPreview.jsx"
import { removeStay } from '../store/actions/stay.actions.js'
import { useParams } from "react-router";
export function StayList({ stays, onRemoveStay, params }) {
    return (
        <ul className="stay-list">
            {stays.map(stay =>
                <StayPreview
                    params={params}
                    key={stay._id}
                    stay={stay}
                    onRemoveStay={onRemoveStay}
                />
            )}
        </ul>
    )
}