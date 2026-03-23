interface ExperienceDescProps {
    description?: string;
}

function ExperienceDesc({ description }: ExperienceDescProps) {
  return (
    <div>
        <h2 className="text-body-18">체험 설명</h2>
        <p className="text-body-16">{description || "체험 설명이 없습니다."}</p>
    </div>
  );
}

export default ExperienceDesc;