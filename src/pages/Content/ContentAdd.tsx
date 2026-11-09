import './Content.scss'
import ContentForm from '../../components/content/ContentForm'
import type { ContentInput } from '../../types/content'
import { uploadThumbnail, addContent, removeThumbnail } from '../../api/contentApi';
import { useState } from 'react';

export default function ContentAdd() {

    const [saving, setSaving] = useState(false);

    const handleAdd = async (content: ContentInput)=>{
        if (saving) return;

        setSaving(true);
        let thumbnailPath = '';

        try {
            thumbnailPath = await uploadThumbnail(content.thumbnail);

            await addContent(content, thumbnailPath);
        }
        catch (error){
            console.error('콘텐츠 등록 실패:', error);

            if (thumbnailPath){
                try {
                    await removeThumbnail(thumbnailPath);
                }
                catch (cleanupError){
                    console.error('이미지 정리 실패:', cleanupError);
                }
            }

            alert('콘텐츠 등록에 실패했습니다. 다시 시도해주세요.');
            return;
        }
        finally {
            setSaving(false);
        }

        alert('콘텐츠가 등록되었습니다.');
    };
    
    return(
        <div className="content-wrap">
            <div className="title">
                <h3>콘텐츠 등록</h3>
            </div>
            <div className="contents">
                <ContentForm onSave={handleAdd} saving={saving} />
            </div>
        </div>
    )
}