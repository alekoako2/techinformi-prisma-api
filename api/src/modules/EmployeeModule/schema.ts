import { gql } from "apollo-server-express";

export const typeDefs = gql`
    extend type Query{
        employees(first:Int, skip:Int):[Employee!]!
    }

    type Employee{
        id: ID!
        inpDate: String
        workExperience: String
        email: String
        gender: Gender
        tel: String
        department: Department
        position: EmployeePosition
        translation(language:LanguageCode): [EmployeeTranslation]
    }

    type EmployeeTranslation{
        firstName: String
        lastName: String
        language:Language!
    }

    enum Gender{
        FEMALE
        MALE
    }

    type Department{
        translation(language:LanguageCode):[DepartmentTranslation]
    }

    type DepartmentTranslation{
        name:String
        language:Language!
    }
    
    type EmployeePosition{
        translation(language:LanguageCode):[EmployeePositionTranslation]
    }
    
    type EmployeePositionTranslation{
        name:String
        language:Language!
    }
`;
