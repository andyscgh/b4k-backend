from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from sqlalchemy.orm import Session
from db import get_db
from models import Employee
from io import BytesIO

router = APIRouter()

@router.post("/employees/import")
async def import_employees(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if file.content_type != 'text/csv' and not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Только CSV-файлы поддерживаются.")
    
    content = await file.read()
    try:
        df = pd.read_csv(BytesIO(content))
    except Exception:
        raise HTTPException(status_code=400, detail="Не удалось прочитать CSV-файл.")

    for _, row in df.iterrows():
        if pd.isna(row["login"]):
            continue
        db_employee = db.query(Employee).filter(Employee.login == row["login"]).first()
        if not db_employee:
            db_employee = Employee(
                login=row["login"],
                full_name=row.get("full_name", ""),
                phone=row.get("phone", ""),
                email=row.get("email", ""),
                skills=row.get("skills", "")
            )
            db.add(db_employee)
    db.commit()

    return {"message": "Сотрудники успешно импортированы"}
