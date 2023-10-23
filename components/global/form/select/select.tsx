'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

const Select = ({ form, name, options, field, placeholder }: any) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant='outline'
            role='combobox'
            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
          >
            {field.value
              ? options.find((option: any) => option.value.toLowerCase() === field.value.toLowerCase())?.label
              : placeholder}
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder={placeholder} className='h-9' />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option: any) => (
              <CommandItem
                value={option.label}
                key={option.label}
                onSelect={value => {
                  const selected = options.find((option: any) => option.label.toLowerCase() === value.toLowerCase());

                  form.setValue(name, selected.value);
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    option.value.toLowerCase() === field.value.toLowerCase() ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Select;
