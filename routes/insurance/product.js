import { useEffect, useState } from "react"
import { DatePicker, Radio, Modal, message, Checkbox } from 'antd';
import moment from 'moment'
import { GetPriceInsuranceService } from "../../service";
import { Encrypt } from '../../utils/SecretCode'

const ProductInsurance = ({ model }) => {

    const [modelSearch, setModelSearch] = useState({})
    const [priceModel, setPriceModel] = useState([])

    useEffect(() => {
        const initialStateModelSearch = {
            gender: 1,
            birthday: moment(calDateYear(model.data.age_start)),
            age: model.data.age_start,
            installment_id: (model.master.installment.length > 0 && model.master.installment) ? model.master.installment[0].id : "7c0244d2-eb1f-48c6-9820-1d690c891015",
            insurance_id: model.data.id
        }
        getPriceInsuranceData(initialStateModelSearch);
        setModelSearch(initialStateModelSearch);
        console.log(`model ------------------> `, model)
    }, [])

    const onChangeDatePicker = async (value) => {
        if (value) {
            const age = calAge(value._d)

            if (age < model.data.age_start || age > model.data.age_end) {
                Modal.warning({
                    title: 'แผนประกันแนะนำ',
                    content: `แผนประกันนี้คุ้มครองช่วงอายุแรกเข้า ${model.data.age_start} - ${model.data.age_end} ปี `,
                });
            } else {
                const _model = { ...modelSearch, age, birthday: value };
                setModelSearch(_model);
                await getPriceInsuranceData(_model);
            }
        }
    }

    /* หาปี */
    const calDateYear = (age) => {
        const year = new Date().getFullYear() - age
        return `${year}-01-01`
    }

    /* หาอายุ */
    const calAge = (date) => {
        return date ? moment().diff(date, 'years') : null;
    }

    /* เลือก Gender */
    const onChangeGender = async (value) => {
        // console.log(`value`, value)
        const _model = { ...modelSearch, gender: value };
        setModelSearch(_model);
        await getPriceInsuranceData(_model);
    }

    /* เลือก งวดชำระเบี้ยประกันภัย */
    const clickButtonInstallment = async (value) => {
        // console.log(`value`, value)
        const _model = { ...modelSearch, installment_id: value };
        setModelSearch(_model);
        await getPriceInsuranceData(_model);
    }

    /* ค้นหาราคา ประกัน */
    const getPriceInsuranceData = async (search) => {
        try {
            const { data } = await GetPriceInsuranceService(search);
            setPriceModel(data.items)
        } catch (error) {
            message.error('เรียกข้อมูลผิดพลาด!');
        }
    }

    /* เลือกแผนประกัน */
    const selectInsurance = (item) => {
        if (model.table.data.length > 0) {
            const index = model.table.data[0].match.findIndex(e => e.mas_plan_id == item.id)
            const match_id = model.table.data[0].match[index].id
            setSelectModel({
                id: item.insurance_id, //รหัสประกัน
                mas_plan_id: item.id, //รหัสแผนประกัน แผน S
                match_id, // รหัสราคาความคุ้มครอง
                mas_installment_id: modelSearch.installment_id, //รหัสรายเดือน
                mas_age_range_id: item.price.mas_age_range_id, //รหัสช่วงอายุ
                confirm_applicant: null,
                birthday: modelSearch.installment_id,
                age: modelSearch.installment_id
            })
            setVisibleSelect(true)
        }
    }

    /* Modal Select Insurance */
    const [checked, setChecked] = useState(false)
    const [visibleSelect, setVisibleSelect] = useState(false)
    const [confirmApplicant, setConfirmApplicant] = useState(false)
    const [selectModel, setSelectModel] = useState({})

    const handleOkSelect = () => {
        if (checked) {
            const data = selectModel
            data.confirm_applicant = confirmApplicant
            setSelectModel({ ...selectModel, confirm_applicant: confirmApplicant })
            const encode = Encrypt(data)
        }
    }

    const handleCancelSelect = () => {
        setSelectModel({})
        setVisibleSelect(false)
    }

    return model ? (
        <>
            <div className="container p-5">
                <div className="row">
                    {
                        // temp.map((e, i) => (
                        model.data.haed_highlight ? model.data.haed_highlight.map((e, i) => (
                            <div className="col-sm-12 col-md-4 text-center" key={i}>
                                <div className="row product-highlight-container">
                                    <div className="col-12">
                                        <img className="product-highlight-icon" src={`${process.env.NEXT_PUBLIC_SERVICE}/uploads/insurance/${model.data.id}/${e.img}`} alt={model.data.name} />
                                    </div>
                                    <div className="col-12 text-container pt-3">
                                        <h4 className="title">{e.title_1}</h4>
                                        <h4 className="title">{e.title_2}</h4>
                                        <p className="sub-title">{e.sub_title}</p>
                                    </div>
                                </div>
                            </div>
                        )) : null
                    }

                    <div className="section-title pt-3">
                        <h2>คำนวณเบี้ยประกัน</h2>
                    </div>

                    <div className="product-cal-premium">
                        <div className="row grid-divider">

                            <div className="col-sm-12 col-md-6">
                                <div className="col-padding">
                                    <div className="row justify-content-center mt-3">
                                        <h4 className="text-center">เลือกเพศ</h4>
                                    </div>
                                    <Radio.Group onChange={(e) => setModelSearch({ ...modelSearch, gender: e.target.value })} value={modelSearch.gender}>
                                        <div className="row justify-content-center mt-2">
                                            <div className="col-5 text-center">
                                                <img className="img-gender" src={modelSearch.gender == 1 ? `/images/gender_active_1.png` : `/images/gender_1.png`} onClick={() => onChangeGender(1)} alt="เพศชาย" />
                                                <br />
                                                <Radio value={1} style={{ display: "none" }} />
                                                {modelSearch.gender == 1 ? <h3 className="display-age"> {modelSearch.age} ปี </h3> : null}
                                            </div>
                                            <div className="col-5 text-center">
                                                <img className="img-gender" src={modelSearch.gender == 2 ? `/images/gender_active_2.png` : `/images/gender_2.png`} onClick={() => onChangeGender(2)} alt="เพศหญิง" />
                                                <Radio value={2} style={{ display: "none" }} />
                                                {modelSearch.gender == 2 ? <h3 className="display-age"> {modelSearch.age} ปี </h3> : null}
                                            </div>
                                        </div>
                                    </Radio.Group>
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-7 m-auto">
                                            <div className="form-group -animated -focus">
                                                <DatePicker onChange={onChangeDatePicker} format="DD/MM/YYYY" value={modelSearch.birthday} placeholder="วัน เดือน ปี เกิด" style={{ width: "100%" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <div className="col-padding ">
                                    <div className="row justify-content-center pl-15-px mt-3">
                                        <h4 className="text-center">งวดชำระเบี้ยประกันภัย</h4>
                                    </div>
                                    <div className="row justify-content-center mt-1 pl-15-px">
                                        {model.master.installment ? model.master.installment.map(e =>
                                            <div className="col-6 col-md-6 p-2" key={e.id}>
                                                <button className={`btn btn-lg btn-block ${e.id == modelSearch.installment_id ? 'btn-mode-payment-select' : "btn-mode-payment"} `} onClick={() => clickButtonInstallment(e.id)} > {e.name} </button>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="row justify-content-center pl-15-px">
                                        <div className="remark"> *กรณีชำระแบบรายเดือน งวดแรกทางบริษัททำการเก็บล่วงหน้า 2 เดือน
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="footer-installment">
                    <div className="view-footer-installment">
                        <img src="/images/Icon-1620619806.png" style={{ height: '15px !important' }} />
                        <span><b> {model.data.count ?? 0} คนสนใจประกันนี้</b></span>
                    </div>
                </div>
            </div>


            {/* table */}
            <div className="container p-5">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className="text-center" width={"40%"}>ตารางความคุ้มครอง</th>
                                {(priceModel) ? priceModel.map((e) =>
                                    <th className="text-center" key={e.id}>
                                        {e.name} <br />
                                        {(e.price.price).toLocaleString("en")}
                                    </th>) : null}
                            </tr>
                        </thead>
                        <tbody>
                            {(model.table.data) ? model.table.data.map(e => (
                                <tr key={e.id} width={"20%"}>
                                    <td dangerouslySetInnerHTML={{ __html: e.details }} />
                                    {e.match.map((x, i) => <td className="text-center" key={i}>{x.value}</td>)}
                                </tr>
                            )) : null}
                            <tr width={"20%"}>
                                <td />
                                {(priceModel) ? priceModel.map((e, i) =>
                                    <td className="text-center" key={i}>
                                        <button className="btn btn-sm btn-danger" onClick={() => selectInsurance(e)} disabled={!e.price.price || e.price.price == "-"} >เลือกแผนนี้</button>
                                    </td>
                                ) : null}

                            </tr>
                        </tbody>


                    </table>

                </div>
            </div>

            {/* Modal Select Insurance  */}

            <Modal
                maskClosable={false}
                visible={visibleSelect}
                title="ข้อตกลงและเงื่อนไข"
                width={800}
                onCancel={handleCancelSelect}
                footer={(
                    <div className="text-center">
                        <button className="btn btn-md btn-orange" disabled={!checked} onClick={() => handleOkSelect()}>ดำเนินการต่อ</button>
                    </div>
                )}
            >
                <div>
                    <div className="simplebar-offset">
                        <div className="simplebar-content" style={{ padding: '6.4px 12.8px' }}>{/**/}
                            <p className="text-justify">ข้าพเจ้ามีความประสงค์ขอเอาประกันภัยกับบริษัทตามเงื่อนไขของกรมธรรม์ประกันภัยที่บริษัทได้ใช้สำหรับการประกันภัยนี้และข้าพเจ้าขอรับรองว่ารายละเอียดต่างๆ ที่ข้าพเจ้าแถลงข้างต้นนี้มีความถูกต้องและสมบูรณ์ ข้าพเจ้าตกลง ที่จะให้คำขอเอาประกันภัยนี้เป็นมูลฐานสัญญาประกันภัยระหว่างข้าพเจ้าและบริษัท</p>
                            <p className="text-justify">ข้าพเจ้ายินยอมให้บริษัทฯ จัดเก็บ ใช้ และเปิดเผยข้อเท็จจริงเกี่ยวกับสุขภาพและข้อมูลของข้าพเจ้าต่อสำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย เพื่อประโยชน์ในการกำกับดูแลธุรกิจประกันภัย</p>
                            <p className="text-justify">ข้าพเจ้ายินยอมให้ บมจ. ซิกน่า ประกันภัย บจ. ซิกน่า โบรกเกอเรจ แอนด์ มาร์เก็ตติ้ง (ประเทศไทย) และบจ. ซิกน่า อินเตอร์เนชั่นแนล มาร์เก็ตติ้ง (ประเทศไทย) (รวมเรียกว่า “บริษัทฯ”) จัดเก็บ ใช้และวิเคราะห์ข้อมูลการเข้าทำประกันภัยที่ข้าพเจ้าได้ให้ไว้ผ่านช่องทางนี้ เพื่อวัตถุประสงค์ในการนำเสนอสิทธิประโยชน์ ผลิตภัณฑ์ประกันภัยอื่น หรือบริการต่างๆ รวมถึงแจ้งข่าวสารของบริษัทฯ</p>
                            <p className="text-justify">*คำเตือน ของสำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัยให้ตอบคำถามข้างต้นตามความเป็นจริงทุกข้อ หากผู้เอาประกันภัยปกปิดข้อความจริง หรือแถลงข้อความอันเป็นเท็จจะมีผลให้สัญญานี้ตกเป็นโมฆียะ ซึ่งบริษัทมีสิทธิบอกล้างสัญญาประกันภัยได้ ตามประมวลกฎหมายแพ่งและพาณิชย์ มาตรา 865</p>
                        </div>
                    </div>

                    <div className="simplebar-condition p-3">
                        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
                            ข้าพเจ้ายอมรับเงื่อนไขและข้อตกลงข้างต้นทุกประการ
                        </Checkbox>
                        <hr />
                        <Checkbox checked={confirmApplicant} onChange={(e) => setConfirmApplicant(e.target.checked)}>
                            ผู้ขอเอาประกันภัย (ในกรณีซื้อประกันนี้ให้ตัวเอง) / ผู้ชำระเบี้ยประกัน (ในกรณีซื้อประกันนี้ให้บิดามารดาหรือบิดามารดาของคู่สมรส) ประสงค์จะใช้สิทธิขอยกเว้นภาษีเงินได้ตามกฎหมายว่าด้วยภาษีอากร และยินยอมให้บริษัทส่งและเปิดเผยข้อมูลของผู้ขอเอาประกันภัยและผู้ชำระเบี้ยประกันภัย และข้อมูลเกี่ยวกับกรมธรรม์ประกันภัยนี้ต่อกรมสรรพากรตามหลักเกณฑ์และวิธีการที่กรมสรรพากรกำหนด
                        </Checkbox>
                    </div>
                </div>

            </Modal>

        </>
    ) : null
}

export default ProductInsurance
