import {TextInput, TextInputProps, View, Pressable, PressableProps} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface ChatFieldProps extends TextInputProps{
  placeholderLabel:string;
  onPressFunc:()=>void;

}

export default function ChatField({placeholderLabel,onPressFunc,...props}:ChatFieldProps){
    const hasText = props.value && props.value.length > 0;
    return(
      
        <View className='flex flex-row gap-3'>
        <TextInput  
        returnKeyType="send"
        onSubmitEditing={onPressFunc} 
        
        multiline
          className="pt-5 text-xl align-middle text-slate-200 bg-indigo-200/5 w-75 rounded-3xl h-20 border tracking-widest border-slate-400/80 pl-3"       
          {...props}
          
          placeholder={`${placeholderLabel}`}
          placeholderTextColor="rgb(148 163 184 / 0.4)"
          selectionColorClassName="accent-slate-400"
        />
        <Pressable onPress={onPressFunc} disabled={!hasText}>
 <Ionicons className={`pt-5 ${hasText?"opacity-100":"opacity-60"}`} name="arrow-up" size={35} color="white"/>
        </Pressable>
        
        </View>



    );
}



