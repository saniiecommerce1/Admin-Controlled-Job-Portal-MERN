1. create jsconfig.json file if wanna .jsx component in shadcn otherwise tsconfig.json file create .tsx component
1. npx shadcn-ui@latest add select
2. import Toaster in app.jsx from ui component and use toast in component from sooner 
3. For PDF upload cloudinary goto cloudinary dashboard > API setting> Security > allow PDF file
4. Clear cookie only works if name + path + domain all Match with the set cookie
5. withCredentials is must define incase of getting and removing cookies (`${import.meta.env.VITE_USER_URL}/logout`,  {}, { withCredentials: true })
6. redux persist is useful in storing state in local storage. UI not flicker when comeback as getting states from local storage
7. workbench.editor.wrapTabs mark click for all open tabs see in vs code
8. FormData if used in FE then req.body is {} bc cannot parse by express.json() so multer used 
9. if file = null or ''  in Formdata then multer do req.file == undefined and req.body.file = 'null'(string convert by FormData) so its best not t pass null
10. import company-logo from '../../assets/company-logo.jpg' is wrong use camelCase 
import companyLogo from '../../assets/company-logo.jpg' 