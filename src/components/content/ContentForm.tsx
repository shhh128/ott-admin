import { Link } from "react-router-dom";
import './ContentForm.scss'
import { ChevronDown, ImageIcon } from "lucide-react"; 
import { useState, type ChangeEvent } from "react";

export default function ContentForm() {
    const [preview, setPreview] = useState('');

    const handleThumbnail = (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            if(typeof reader.result === 'string'){
                setPreview(reader.result);
            }
        }

        reader.readAsDataURL(file);
    }

    return (
        <form 
            className="content-form"
            onSubmit={(e)=>e.preventDefault()}
        >
            <section className="form-section">
                <h4>기본 정보</h4>
                <div className="form-box">
                    <div className="form-field">
                        <label htmlFor="content-title">제목</label>
                        <input 
                            id="content-title"
                            name="title"
                            type="text" 
                            placeholder="콘텐츠 제목을 입력하세요."
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="content-type">종류</label>
                        <div className="select-box">
                            <select name="type" id="content-type" defaultValue="" required>
                                <option value="" disabled>선택</option>
                                <option value="MOVIE">영화</option>
                                <option value="SERIES">시리즈</option>
                            </select>
                            <ChevronDown size={18} aria-hidden="true" />
                        </div>
                    </div>
                    <fieldset className="form-field full">
                        <legend>장르</legend>
                        <div className="genre-options">
                            {[
                                '드라마', '예능', '시트콤', '로맨스', '코미디', '액션',
                    'SF', '판타지', '애니메이션', '범죄', '스릴러', '메티컬'
                            ].map((genre)=>(
                                <label key={genre}>
                                    <input 
                                        type="checkbox" 
                                        name="genres"
                                        value={genre}
                                    />
                                    <span>{genre}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    <div className="form-field">
                        <label htmlFor="content-age">연령 등급</label>
                        <div className="select-box">
                            <select name="ageRating" id="content-age" defaultValue="" required>
                                <option value="" disabled>선택</option>
                                <option value="전체관람가">전체관람가</option>
                                <option value="12세 이상">12세 이상</option>
                                <option value="15세 이상">15세 이상</option>
                                <option value="청소년 관람불가">청소년 관람불가</option>
                            </select>
                            <ChevronDown size={18} aria-hidden="true" />
                        </div>
                    </div>
                    <div className="form-field full">
                        <label htmlFor="content-thumbnail">썸네일</label>
                        <div className="thumbnail-upload">
                            <div className="thumbnail-preview">
                                {preview ? (
                                    <img src={preview} alt="선택한 썸네일 미리봅기" />
                                ) : (
                                    <ImageIcon size={32} aria-hidden="true" />
                                )}
                            </div>
                            <div className="thumbnail-controls">
                                <input
                                    id="content-thumbnail" 
                                    name="thumbnail"
                                    type="file" 
                                    accept="image/*"
                                    required
                                    onChange={handleThumbnail}
                                />
                                <p>JPG, PNG 이미지를 선택하세요.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="form-section">
                <h4>상세 정보</h4>
                <div className="form-box">
                    <div className="form-field">
                        <label htmlFor="content-director">감독</label>
                        <input 
                            id="content-director"
                            name="director"
                            type="text"
                            placeholder="감독명을 입력하세요."
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="content-cast">출연진</label>
                        <input 
                            id="content-cast"
                            name="cast"
                            type="text" 
                            placeholder="쉼표로 구분해 입력하세요."
                            required
                        />
                    </div>
                    <div className="form-field full">
                        <label htmlFor="content-synopsis">줄거리</label>
                        <textarea 
                            id="content-synopsis"
                            name="synopsis"
                            placeholder="콘텐츠의 줄거리를 입력하세요." 
                            rows={4}
                            required
                        />
                    </div>
                </div>
            </section>
            <section className="form-section">
                <h4>공개 설정</h4>
                <div className="form-box">
                    <div className="form-field">
                        <label htmlFor="content-release">공개일</label>
                        <input 
                            id="content-release"
                            name="releaseDate"
                            type="date" 
                            required
                        />
                    </div>
                    <fieldset className="form-field">
                            <legend>공개 여부</legend>
                            <div className="status-options">
                                <label>
                                    <input 
                                        type="radio"
                                        name="status" 
                                        value="PUBLIC"
                                        defaultChecked
                                    />
                                    <span>공개</span>
                                </label>
                                <label>
                                    <input 
                                        type="radio"
                                        name="status" 
                                        value="PRIVATE"
                                    />
                                    <span>비공개</span>
                                </label>
                            </div>
                    </fieldset>
                </div>
            </section>
            <div className="form-actions">
                <Link to="/content" className="cancel-btn">취소</Link>
                <button type="submit" className="submit-btn">등록</button>
            </div>
        </form>
    );
}