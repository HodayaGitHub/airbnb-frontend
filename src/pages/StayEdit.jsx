
import { useNavigate, useParams } from 'react-router'
import { stayService } from '../services/stay.service.local.js'
import { useEffect, useState } from 'react'
import { addStay } from '../store/actions/stay.actions.js'
import { uploadService } from '../services/upload.service.js'

export function StayEdit() {
    const [stay, setStay] = useState(stayService.getEmptyStay())
    const [amentity, setAmentity] = useState({
        Essentials: [],
        Features: [],
        Location: [],
        Safty: []
    })
    const [isUploading, setIsUploading] = useState(false)
    const { stayId } = useParams()
    const navigate = useNavigate()
    const amentities = stayService.getAmentities()


    useEffect(() => {
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (target.type === 'range') {
            value = +value
        }

        setStay(prevStay => ({ ...prevStay, [field]: value }))
    }

    function handlePriceChange({ target }) {
        let value = +target.value
        setStay(prevStay => ({ ...prevStay, price: value }))
    }



    function handleSubmit(e) {
        e.preventDefault()
        if (!stay.name || !stay.price) return
        onAddStay(stay)
    }

    async function onAddStay(stay) {
        try {
            await addStay(stay)
            navigate('/')
        }
        catch (err) {
            console.log('Cannot add stay', err)
        }
    }


    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url } = await uploadService.uploadImg(ev)
        console.log(secure_url)
        let imgUrls = stay.imgUrls
        imgUrls.push(secure_url)
        setStay(prevStay => ({ ...prevStay, imgUrls }))
        setIsUploading(false)
    }
    function handleAmentityChange(ev) {
        const { checked, name, className } = ev.target
        if (checked) {
            amentity[className].push(name)
        } else {
            const index = amentity[className].indexOf(name);
            if (index !== -1) {
                amentity[className].splice(index, 1);
            }
        }
        const amenities = amentity
        setStay(prevStay => ({ ...prevStay, amenities }))
    }

    // return {
    //     name: '',v
    //     type: '',v
    //     imgUrls: [],v
    //     price: '',v
    //     summary: '',v
    //     capacity: '',v
    //     amenities: [],v
    //     labels: [],
    //     host: {},
    //     loc: {},
    //     reviews: []
    //   }

    const { name, type, summery, price, capacity, roomCount, bedCount, bathroomCounts } = stay
    return (
        <section className="stay-edit" >

            <form onSubmit={handleSubmit} >
                <label htmlFor="name">name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="summary">summary:</label>
                <textarea style={{ height: '90px', width: '300px' }} onChange={handleChange} value={summery} name="summary" id="summary" />


                <label htmlFor="price">price</label>
                <input onChange={handlePriceChange} value={price || ''} type="number" name="price" id="price" />


                <label htmlFor="capacity">capacity:</label>
                <span>{capacity || 'choose capacity'}</span>
                <input type="range" name="capacity" id="capacity" min="1" value={capacity} max="20" onChange={handleChange} />


                <label htmlFor="type">property type:</label>
                <select name="type" id="type" value={type} onChange={handleChange} >
                    <option value="">select</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="guest-house">GuestHouse</option>
                    <option value="hotel">Hotel</option>
                </select>

                <label htmlFor="roomCount"> how many rooms:</label>
                <span>{roomCount || 'choose amount'}</span>
                <input type="range" name="roomCount" id="roomCount" min="1" value={roomCount} max="8" onChange={handleChange} />

                <label htmlFor="bedCount"> how many beds:</label>
                <span>{bedCount || 'choose amount'}</span>
                <input type="range" name="bedCount" id="bedCount" min="1" value={bedCount} max="8" onChange={handleChange} />

                <label htmlFor="bathroomCounts"> how many bath rooms:</label>
                <span>{bathroomCounts || 'choose amount'}</span>
                <input type="range" name="bathroomCounts" id="bathroomCounts" min="1" value={bathroomCounts} max="8" onChange={handleChange} />


                <label htmlFor="imgs"> upload your property imgs:</label>
                <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
                {isUploading && <span>uploading please wait...</span>}

                <section className='amentities'>
                    <label htmlFor="amentities"> amentities:</label>
                    <h3>Essentials:</h3>
                    {amentities.Essentials.map(amentity => <><input key={amentity} onChange={handleAmentityChange} type="checkbox" className='Essentials' name={amentity} /><span>{amentity}</span></>)}
                    <h3>Features:</h3>
                    {amentities.Features.map(amentity => <><input key={amentity} onChange={handleAmentityChange} type="checkbox" name={amentity} className='Features' /><span>{amentity}</span></>)}
                    <h3>Location:</h3>
                    {amentities.Location.map(amentity => <><input key={amentity} onChange={handleAmentityChange} type="checkbox" name={amentity} className='Location' /><span>{amentity}</span> </>)}
                    <h3>Safty:</h3>
                    {amentities.Safty.map(amentity => <><input key={amentity} onChange={handleAmentityChange} type="checkbox" name={amentity} className='Safty' /><span>{amentity}</span></>)}
                </section >


                <button disabled={!stay.name || isUploading}>Save</button>
            </form>

        </section>
    )

}
