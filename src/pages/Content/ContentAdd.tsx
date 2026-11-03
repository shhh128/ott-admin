import './Content.scss'
import ContentForm from '../../components/content/ContentForm'
import type { ContentInput } from '../../types/content'

export default function ContentAdd() {

    const handleAdd = (content: ContentInput)=>{
        console.log('등록할 콘텐츠:', content);
    };
    
    return(
        <div className="content-wrap">
            <div className="title">
                <h3>콘텐츠 등록</h3>
            </div>
            <div className="contents">
                <ContentForm onSave={handleAdd} />
            </div>
        </div>
    )
}