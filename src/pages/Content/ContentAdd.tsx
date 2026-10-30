import './Content.scss'
import ContentForm from '../../components/content/ContentForm'

export default function ContentAdd() {
    return(
        <div className="content-wrap">
            <div className="title">
                <h3>콘텐츠 등록</h3>
            </div>
            <div className="contents">
                <ContentForm />
            </div>
        </div>
    )
}