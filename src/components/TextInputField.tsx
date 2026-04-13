import {TextInput, TextInputProps, View, Text, Pressable, Keyboard } from 'react-native';

interface TextInputFieldProps extends TextInputProps{
  label:string;
  placeholderLabel:string;
  variant?:"default"|"idInput"
}

export default function TextInputField({label,placeholderLabel,variant="default",...props}:TextInputFieldProps){

const isDefault = variant === "default";

    return(
       <Pressable onPress={Keyboard.dismiss} className="flex-1">
<View className="gap-2">
        <Text className="text-xs text-slate-300 tracking-[.10em]">
          {label}
        </Text>

        <TextInput   
        maxLength={isDefault?30:6}
          className={`pb-2  text-xl text-slate-200 bg-indigo-200/5 w-80 rounded-2xl h-16 border border-slate-400/80 pl-4 tracking-widest ${isDefault?"capitalize":"text-center tracking-[.50em] uppercase"}`}    
          {...props}
          
          placeholder={`${placeholderLabel}`}
          
          placeholderTextColor="rgb(148 163 184 / 0.4)"
         
          selectionColorClassName="accent-slate-400"
        />
</View>

       </Pressable>

    );
}



