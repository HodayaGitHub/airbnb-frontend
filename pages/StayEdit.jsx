
import { useNavigate, useParams } from 'react-router'
import { stayService } from '../services/stay.service.local.js'
import { useEffect, useState } from 'react'
import { addStay } from '../store/actions/stay.actions.js'
import { uploadService } from '../services/upload.service.js'

export function StayEdit() {
    const [stay, setStay] = useState(stayService.getEmptyStay())
    const [amentity, setAmentity] = useState([])
    const [label, setLabel] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    const { stayId } = useParams()
    const navigate = useNavigate()
    const amentities = stayService.getAmentities()
    const labels = stayService.getLocalLabels()

    useEffect(() => {
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (target.type === 'range') {
            value = +value
        }
        else if (target.type === 'radio') {
            value = target.id

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

    function handleLablesChange(ev) {
        const { checked, name } = ev.target
        if (checked) {
            label.push(name)
        } else {
            const index = label.indexOf(name);
            if (index !== -1) {
                label.splice(index, 1)
            }
        }
        const labels = label
        setStay(prevStay => ({ ...prevStay, labels }))
    }
    function handleAmentityChange(ev) {
        const { checked, name } = ev.target
        if (checked) {
            amentity.push(name)
        } else {
            const index = amentity.indexOf(name);
            if (index !== -1) {
                amentity.splice(index, 1)
            }
        }
        const amentities = amentity
        setStay(prevStay => ({ ...prevStay, amentities }))
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

    const { name, type, privacy, summery, price, capacity, roomCount, bedCount, bathroomCounts } = stay
    return (
        <section className="stay-edit" >

            <form onSubmit={handleSubmit} >
                <section className='basic-data'>
                    <label htmlFor="name">name:</label>
                    <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                    <label htmlFor="summary">summary:</label>
                    <textarea style={{ height: '90px', width: '300px' }} onChange={handleChange} value={summery} name="summary" id="summary" />


                    <label htmlFor="price">price</label>
                    <input onChange={handlePriceChange} value={price || ''} type="number" name="price" id="price" />


                    <label htmlFor="type">property type:</label>
                    <select name="type" id="type" value={type} onChange={handleChange} >
                        <option value="">select</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="guest-house">GuestHouse</option>
                        <option value="hotel">Hotel</option>
                    </select>

                    <label>select privacy type</label>
                    <div className="privacy-selection">
                        <label htmlFor="privacy">entire place </label>
                        <input onChange={handleChange} value={privacy} type="radio" name="privacy" id="an entire place" className='entire-place' />
                        <label htmlFor="privacy">shared room </label>
                        <input onChange={handleChange} value={privacy} type="radio" name="privacy" id="a shared room" className='shared-room' />
                        <label htmlFor="privacy">private room </label>
                        <input onChange={handleChange} value={privacy} type="radio" name="privacy" id="a private room" className='private-room' />
                    </div>

                </section>
                <section className="numeric-selection">
                    <label htmlFor="capacity">capacity:</label>
                    <input type="range" name="capacity" id="capacity" min="1" value={capacity} max="20" onChange={handleChange} />
                    <span>{capacity || 'choose capacity'}</span>

                    <label htmlFor="roomCount"> rooms:</label>
                    <input type="range" name="roomCount" id="roomCount" min="1" value={roomCount} max="8" onChange={handleChange} />
                    <span>{roomCount || 'choose amount'}</span>

                    <label htmlFor="bedCount">  beds:</label>
                    <input type="range" name="bedCount" id="bedCount" min="1" value={bedCount} max="8" onChange={handleChange} />
                    <span>{bedCount || 'choose amount'}</span>

                    <label htmlFor="bathroomCounts"> bath rooms:</label>
                    <input type="range" name="bathroomCounts" id="bathroomCounts" min="1" value={bathroomCounts} max="8" onChange={handleChange} />
                    <span>{bathroomCounts || 'choose amount'}</span>
                </section>
                <section className="upload-imgs">
                    <label htmlFor="imgUpload" className='custom-btn'> upload imgs</label>
                    <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" className='imgUpload' />
                    {isUploading && <span className='uploading-msg'>uploading please wait...</span>}
                </section>


                <label htmlFor="amentities"> select amentities</label>
                <h4>Essentials</h4>
                <div className="checkbox-list">
                    {amentities.Essentials.map(amentity => <div className='checkbox-item'><input key={amentity} onChange={handleAmentityChange} type="checkbox" className='Essentials' name={amentity} className='amentities' /><span>{amentity}</span></div>)}
                </div>
                <h4>Features</h4>
                <div className="checkbox-list">
                    {amentities.Features.map(amentity => <div className='checkbox-item'><input key={amentity} onChange={handleAmentityChange} type="checkbox" name={amentity} className='Features' className='amentities' /><span>{amentity}</span></div>)}
                </div>
                <h4>Location</h4>
                <div className="checkbox-list">
                    {amentities.Location.map(amentity => <div className='checkbox-item'><input key={amentity} onChange={handleAmentityChange} type="checkbox" name={amentity} className='Location' className='amentities' /><span>{amentity}</span> </div>)}
                </div>
                <h4>Safty</h4>
                <div className="checkbox-list">
                    {amentities.Safty.map(amentity => <div className='checkbox-item'><input key={amentity} onChange={handleAmentityChange} type="checkbox" name={amentity} className='Safty' className='amentities' /><span>{amentity}</span></div>)}
                </div>



                <label htmlFor="labels"> select labels</label>

                <div className="checkbox-list">
                    {labels.map(label => <div className='checkbox-item'><input key={label.title} onChange={handleLablesChange} type="checkbox" name={label.title} className='labels' /><span>{label.title}</span></div>)}
                </div>


                <button disabled={!stay.name || isUploading}>Save</button>
            </form>

        </section>
    )

}
